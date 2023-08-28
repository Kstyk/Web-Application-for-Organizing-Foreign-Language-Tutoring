# Generated by Django 4.2 on 2023-08-28 09:27

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0023_alter_address_city_alter_address_postal_code_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdetails',
            name='year_of_birth',
            field=models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(1900), django.core.validators.MaxValueValidator(2023)]),
        ),
    ]
