# Generated by Django 4.2 on 2023-08-01 16:12

import classes.validators
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('classes', '0008_schedule_classes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='class',
            name='max_number_of_lessons',
        ),
        migrations.RemoveField(
            model_name='class',
            name='stationary',
        ),
        migrations.AlterField(
            model_name='schedule',
            name='date',
            field=models.DateField(help_text='YYYY-MM-DD', validators=[classes.validators.validate_future_date]),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teacher', to=settings.AUTH_USER_MODEL, validators=[classes.validators.validate_teacher_role]),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='timeslot',
            field=models.IntegerField(choices=[(0, '09:00 – 10:00'), (1, '10:00 – 11:00'), (2, '11:00 – 12:00'), (3, '12:00 – 13:00'), (4, '13:00 – 14:00'), (5, '14:00 – 15:00'), (6, '15:00 – 16:00'), (7, '16:00 – 17:00'), (8, '17:00 – 18:00'), (9, '18:00 – 19:00')]),
        ),
    ]