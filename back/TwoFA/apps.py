from django.apps import AppConfig


class TwoFAConfig(AppConfig):
	name = 'TwoFA'
    
	def ready(self):
		import TwoFA.signals
