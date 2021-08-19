from django.contrib import admin

from basic.models.user import User, TCI_RS, UserSurvey
from basic.models.site import Site, SiteAnalysis
from basic.models.prediction import Prediction, SiteSurvey

# User
admin.site.register(User)
admin.site.register(TCI_RS)
admin.site.register(UserSurvey)

# Site
admin.site.register(Site)
admin.site.register(SiteAnalysis)

# Prediction
admin.site.register(Prediction)
admin.site.register(SiteSurvey)
