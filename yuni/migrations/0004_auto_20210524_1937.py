# Generated by Django 3.2 on 2021-05-24 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yuni', '0003_auto_20210524_1914'),
    ]

    operations = [
        migrations.AlterField(
            model_name='branch',
            name='lattitude',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='branch',
            name='longitude',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='fieldmappings',
            name='platformVariables',
            field=models.CharField(blank=True, max_length=250),
        ),
    ]
