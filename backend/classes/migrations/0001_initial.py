# Generated by Django 4.2 on 2023-09-22 19:13

import autoslug.fields
import classes.validators
import django.core.validators
from django.db import migrations, models
import multiselectfield.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('price_for_lesson', models.DecimalField(decimal_places=2, max_digits=6)),
                ('description', models.TextField(blank=True, null=True)),
                ('able_to_buy', models.BooleanField(default=True)),
                ('place_of_classes', multiselectfield.db.fields.MultiSelectField(blank=True, choices=[('stationary', 'Stacjonarnie'), ('online', 'Online')], max_length=150, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('slug', autoslug.fields.AutoSlugField(editable=False, null=True, populate_from='name')),
            ],
        ),
        migrations.CreateModel(
            name='Opinion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('published_date', models.DateTimeField(auto_now_add=True)),
                ('rate', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)])),
                ('content', models.TextField(blank=True, null=True)),
            ],
            options={
                'ordering': ['-published_date'],
            },
        ),
        migrations.CreateModel(
            name='PurchaseHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('place_of_classes', models.TextField(blank=True, choices=[('stationary', 'Stacjonarnie'), ('online', 'Online')], null=True)),
                ('start_date', models.DateTimeField(blank=True, null=True)),
                ('paid_price', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('amount_of_lessons', models.PositiveIntegerField()),
                ('purchase_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(validators=[classes.validators.validate_future_date])),
                ('place_of_classes', models.TextField(blank=True, choices=[('stationary', 'Stacjonarnie'), ('online', 'Online')], null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Timeslot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day_of_week', models.IntegerField(choices=[(1, 'MONDAY'), (2, 'TUESDAY'), (3, 'WEDNESDAY'), (4, 'THURSDAY'), (5, 'FRIDAY'), (6, 'SATURDAY'), (0, 'SUNDAY')])),
                ('timeslot_index', models.IntegerField(choices=[(0, '09:00 – 10:00'), (1, '10:00 – 11:00'), (2, '11:00 – 12:00'), (3, '12:00 – 13:00'), (4, '13:00 – 14:00'), (5, '14:00 – 15:00'), (6, '15:00 – 16:00'), (7, '16:00 – 17:00'), (8, '17:00 – 18:00'), (9, '18:00 – 19:00')])),
                ('is_available', models.BooleanField(default=True)),
            ],
        ),
    ]
