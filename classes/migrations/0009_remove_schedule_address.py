# Generated by Django 4.2 on 2023-11-01 07:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0008_remove_purchasehistory_city_of_classes_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='schedule',
            name='address',
        ),
    ]