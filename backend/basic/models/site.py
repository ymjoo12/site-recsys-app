from django.db import models


class SiteAnalysis(models.Model):
    id = models.BigAutoField(help_text="SiteAnalysis ID", primary_key=True)

    l_aeq = models.FloatField()
    l_ceq = models.FloatField()

    green_ratio = models.FloatField()
    grey_ratio = models.FloatField()
    sky_ratio = models.FloatField()

    people_count = models.IntegerField()
    vehicle_count = models.IntegerField()
    # TODO: 정확한 자료형 설정 필요


class Site(models.Model):
    id = models.BigAutoField(help_text="Site ID", primary_key=True)
    site_analysis_id = models.ForeignKey(SiteAnalysis, on_delete=models.CASCADE, null=True)
    
    name = models.CharField(max_length=256)
    media_url = models.URLField()
