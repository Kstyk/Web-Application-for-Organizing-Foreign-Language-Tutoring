# Generated by Django 4.2 on 2023-09-17 10:20

from django.db import migrations, models
import django.db.models.deletion
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0033_alter_userdetails_sex'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdetails',
            name='address',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='users.address'),
        ),
        migrations.AlterField(
            model_name='userdetails',
            name='place_of_classes',
            field=multiselectfield.db.fields.MultiSelectField(blank=True, choices=[('stationary', 'Stacjonarnie'), ('online', 'Online')], max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='userdetails',
            name='sex',
            field=models.CharField(blank=True, choices=[('mężczyzna', 'mężczyzna'), ('kobieta', 'kobieta')], max_length=20, null=True),
        ),
    ]
