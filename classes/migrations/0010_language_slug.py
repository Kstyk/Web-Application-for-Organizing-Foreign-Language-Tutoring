# Generated by Django 4.2 on 2023-08-02 08:41

import autoslug.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0009_remove_class_max_number_of_lessons_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='language',
            name='slug',
            field=autoslug.fields.AutoSlugField(editable=False, null=True, populate_from='name'),
        ),
    ]