# Generated by Django 4.2 on 2023-08-28 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0005_alter_file_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='file_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
