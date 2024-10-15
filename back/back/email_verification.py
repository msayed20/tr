from django.conf import settings
import smtplib
from email.message import EmailMessage


def send_email(verification_code, email, username):
    msg = EmailMessage()
    
    msg.set_content(f"""
    Dear {username},

    Welcome to PongGame! To complete your registration, please use the following verification details:

    User: {username}
    Verification Code: {verification_code}

    If you did not request this code, please ignore this message.

    Best regards,
    The PongGame Team
    """)

    msg['Subject'] = 'PongGame - Your Verification Code'

    email_sender = settings.EMAIL_CODE
    msg['From'] = email_sender
    msg['To'] = email
    password = settings.EMAIL_CODE_PASSWORD

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(email_sender, password)
    server.send_message(msg)
    server.quit()

