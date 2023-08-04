from django.urls import path
from .views import UserRegistrationView, RolesListView, UsersListView, TeachersListView, UserDetailsCreateView, UserDetailsUpdateView, UserProfileView, UserUpdateView, VoivodeshipListView, CityListView, get_top_cities, CityByIdView
urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name="user_registration"),
    path('roles/', RolesListView.as_view(), name="all_roles"),
    path('', UsersListView.as_view(), name="all_users"),
    path('teachers/', TeachersListView.as_view()),
    path('add-informations/', UserDetailsCreateView.as_view()),
    path('profile/<int:user_id>/', UserProfileView.as_view()),
    path('profile/<pk>/edit-informations/', UserDetailsUpdateView.as_view()),
    path('edit/', UserUpdateView.as_view()),
    path('address/voivodeships/', VoivodeshipListView.as_view()),
    path('address/cities/', CityListView.as_view()),
    path('address/city/<int:pk>/', CityByIdView.as_view()),
    path('address/cities/most-popular/', get_top_cities)
]
