from django.db import models
from django.core.validators import MinValueValidator
from .validators import validate_teacher_role, validate_future_date, validate_student_role, validate_teacher_for_timeslot
from rooms.models import Room
from autoslug import AutoSlugField
from multiselectfield import MultiSelectField
# Create your models here.


class Language(models.Model):
    name = models.CharField(null=False, blank=False, max_length=255)
    slug = AutoSlugField(populate_from='name', null=True)

    def __str__(self):
        return self.name


class Class(models.Model):
    teacher = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, validators=[validate_teacher_role])
    language = models.ForeignKey(
        Language, on_delete=models.PROTECT, null=True, related_name="class_language"
    )
    name = models.CharField(max_length=255, null=False, blank=False)
    difficulty_level = models.CharField(null=False, blank=False, max_length=50)
    active = models.BooleanField(default=True)
    price_for_lesson = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField()
    able_to_buy = models.BooleanField(default=True, null=True, blank=True)

    def __str__(self):
        return self.name


TEACHER_HOME = 'teacher_home'
STUDENT_HOME = 'student_home'
ONLINE = 'online'
LOCATION_CHOICES = [
    (TEACHER_HOME, 'U nauczyciela'),
    (STUDENT_HOME, 'U ucznia'),
    (ONLINE, 'Online'),
]


class PurchaseHistory(models.Model):
    student = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, validators=[validate_student_role]
    )
    classes = models.ForeignKey(
        Class, on_delete=models.CASCADE
    )
    place_of_classes = models.TextField(
        choices=LOCATION_CHOICES, null=True, blank=True)
    room = models.ForeignKey(
        Room, on_delete=models.PROTECT, null=True, blank=True
    )
    start_date = models.DateTimeField(blank=True, null=True)
    paid_price = models.DecimalField(
        blank=True, null=True, max_digits=6, decimal_places=2)
    amount_of_lessons = models.PositiveIntegerField(null=False, blank=False)
    purchase_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.first_name} {self.student.last_name} - {self.classes.name}"


class Timeslot(models.Model):
    class Meta:
        unique_together = ('teacher', 'day_of_week', 'timeslot_index')
    TIMESLOT_LIST = (
        (0, '09:00 – 10:00'),
        (1, '10:00 – 11:00'),
        (2, '11:00 – 12:00'),
        (3, '12:00 – 13:00'),
        (4, '13:00 – 14:00'),
        (5, '14:00 – 15:00'),
        (6, '15:00 – 16:00'),
        (7, '16:00 – 17:00'),
        (8, '17:00 – 18:00'),
        (9, '18:00 – 19:00'),
    )

    DAY_OF_WEEK_LIST = (
        (1, 'MONDAY'),
        (2, 'TUESDAY'),
        (3, 'WEDNESDAY'),
        (4, 'THURSDAY'),
        (5, 'FRIDAY'),
        (6, 'SATURDAY'),
        (0, 'SUNDAY')
    )

    teacher = models.ForeignKey(
        'users.User', on_delete=models.CASCADE,  validators=[validate_teacher_role])
    day_of_week = models.IntegerField(choices=DAY_OF_WEEK_LIST)
    timeslot_index = models.IntegerField(choices=TIMESLOT_LIST)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return '{} {} {}'.format(self.day_of_week, self.timeslot_index, self.teacher)


class Schedule(models.Model):
    class Meta:
        unique_together = ('classes', 'date')

    date = models.DateTimeField(null=True,
                                blank=True, validators=[validate_future_date])
    student = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, null=True, blank=True, related_name="student", validators=[validate_student_role]
    )
    classes = models.ForeignKey(
        Class, on_delete=models.CASCADE, related_name="classes", null=True, blank=True
    )
    place_of_classes = models.TextField(
        choices=LOCATION_CHOICES, null=True, blank=True)

    def __str__(self):
        return '{} {}'.format(self.date, self.classes.teacher)
