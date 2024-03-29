from django.urls import path
from .views import *
urlpatterns = [
    path('', get_all_classes, name="get_all_classes"),
    path('languages/', get_languages, name="get_languages"),
    path('languages/most-popular/', get_top_languages,
         name="get_popular_languages"),
    path('create/', ClassCreateView.as_view(), name="create_class"),
    path('update/<int:pk>/', ClassCreateView.as_view(), name="update_class"),
    path('teacher-classes/', TeacherClassesView.as_view()),
    path('timeslots/create/',
         TimeSlotsCreateView.as_view()),
    path('<int:teacher_id>/timeslots/', TimeslotsTeacherView.as_view()),
    path('<int:teacher_id>/schedule/', ScheduleTeacherView.as_view()),
    path('<int:student_id>/student-schedule/', ScheduleStudentView.as_view()),
    path('purchase_classes/', purchase_classes, name="purchase_classes"),
    path('purchase_classes_after_ask/', purchase_classes_after_ask,
         name="purchase_classes_after_ask"),
    path('purchase-classes/history/', PurchaseHistoryList.as_view(),
         name="purchase_classes_history"),
    path('purchase-classes/teacher-history/', TeacherPurchaseHistoryList.as_view(),
         name="purchase_classes_teacher_history"),
    path('purchase-classes/classes-bought-by-student-teacher/',
         ClassesBoughtByStudentToRateView.as_view()),
    path('<int:pk>/', ClassesByIdView.as_view()),
    path('<int:teacher_id>/opinions/', TeacherOpinionsList.as_view()),
    path('my-opinions/', ReceivedOpinionsList.as_view()),
    path('added-opinions/', AddedOpinionsList.as_view()),
    path('add-opinion/', CreateOpinionView.as_view()),
    path('update-opinion/<int:pk>/',
         UpdateOpinionView.as_view(), name='update-opinion'),
    path('delete-opinion/<int:pk>/',
         DeleteOpinionView.as_view(), name='delete-opinion'),
    path('ask-about/', AskClassesCreateView.as_view()),
    path('response-ask/', ResponseAskClassesView.as_view()),
    path('sended-questions/', SendedQuestionsListView.as_view()),
    path('received-questions/', ReceivedQuestionsListView.as_view()),

]
