# Generated by Django 3.2.6 on 2021-12-03 12:27

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basic', '0015_alter_image_date_uploaded'),
    ]

    operations = [
        migrations.DeleteModel(
            name='VideoResult',
        ),
        migrations.AlterField(
            model_name='image',
            name='date_uploaded',
            field=models.DateTimeField(default=datetime.datetime(2021, 12, 3, 12, 27, 6, 284560)),
        ),
    ]
