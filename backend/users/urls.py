from django.urls import path
from .views import UserRegistrationView, RolesListView, UsersListView, TeachersListView, UserDetailsUpdateView, UserProfileView, UserUpdateView, VoivodeshipListView, CityListView, get_top_cities, CityByIdView, BaseUserView, ChangePasswordView, LoggeUserProfileView, PasswordResetRequestView, ResetPasswordView, CreatePrivateMessageView, PrivateConversationsListView, PrivateMessageViewSet, UnreadPrivateMessagesCountView
urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name="user_registration"),
    path('roles/', RolesListView.as_view(), name="all_roles"),
    path('', UsersListView.as_view(), name="all_users"),
    path('teachers/', TeachersListView.as_view()),
    path('profile/', LoggeUserProfileView.as_view()),
    path('profile/<int:user_id>/', UserProfileView.as_view()),
    path('profile/edit-informations/', UserDetailsUpdateView.as_view()),
    path('profile/base-user/', BaseUserView.as_view()),
    path('edit/', UserUpdateView.as_view()),
    path('change-password/', ChangePasswordView.as_view()),
    path('reset-password-request/', PasswordResetRequestView.as_view(),
         name='reset-password-request'),
    path('reset-password/', ResetPasswordView.as_view(),
         name='reset-password'),
    path('address/voivodeships/', VoivodeshipListView.as_view()),
    path('address/cities/', CityListView.as_view()),
    path('address/city/<int:pk>/', CityByIdView.as_view()),
    path('address/cities/most-popular/', get_top_cities),
    path('send-private-message/', CreatePrivateMessageView.as_view()),
    path('private-conversations/', PrivateConversationsListView.as_view()),
    path('private-conversation/messages/',
         PrivateMessageViewSet.as_view({'get': 'list'}), name='get_private_messages'),
    path('unread-messages-count/', UnreadPrivateMessagesCountView.as_view(),
         name='unread-messages-count'),

]
