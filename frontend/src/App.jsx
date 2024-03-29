import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/GeneralComponents/Navbar'
import PrivateRoute from './components/AccessComponents/PrivateRoute'
import TeacherAllowed from './components/AccessComponents/TeacherAllowed'
import StudentAllowed from './components/AccessComponents/StudentAllowed'
import ProfilePage from './pages/ProfilePage'
import { AuthProvider } from './context/AuthContext'
import { NotificationContextProvider } from './context/NotificationContext'
import { RoomProvider } from './context/RoomContext'
import RegistrationPage from './pages/RegistrationPage'
import StartedRoomsPage from './pages/StartedRoomsPage'
import Room from './components/RoomComponents/Room'
import SearchClassesPage from './pages/SearchClassesPage'
import ClassesPage from './pages/ClassesPage'
import BuyClassesPage from './pages/BuyClassesPage'
import TeacherPage from './pages/TeacherPage'
import EditBaseProfile from './pages/EditBaseProfile'
import ChangePasswordPage from './pages/ChangePasswordPage'
import EditMoreInfosPage from './pages/EditMoreInfosPage'
import ChangeAvatarPage from './pages/ChangeAvatarPage'
import StudentProfilePage from './pages/StudentProfilePage'
import PurchaseHistoryPage from './pages/PurchaseHistoryPage'
import { ToastContainer } from 'react-toastify'
import ReceivedOpinions from './pages/ReceivedOpinions'
import StudentPage from './pages/StudentPage'
import ModifyTimeslotsPage from './pages/ModifyTimeslotsPage'
import CreateClassesPage from './pages/CreateClassesPage'
import ListOfTeachersClassesPage from './pages/ListOfTeachersClassesPage'
import EditClassesPage from './pages/EditClassesPage'
import AnonymousRoute from './components/AccessComponents/AnonymousRoute'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import TeacherSchedulePage from './pages/TeacherSchedulePage'
import StudentSchedulePage from './pages/StudentSchedulePage'
import AddedOpinionsPage from './pages/AddedOpinionsPage'
import TeacherPurchaseHistoryPage from './pages/TeacherPurchaseHistoryPage'
import InboxPage from './pages/InboxPage'
import AskAboutClassesPage from './pages/AskAboutClassesPage'
import SendedQuestionsAboutClassesPage from './pages/SendedQuestionsAboutClassesPage'
import ReceivedQuestionsAboutClassesPage from './pages/ReceivedQuestionsAboutClassesPage'
import BuyClassesPageAfterAsk from './pages/BuyClassesPageAfterAsk'
import Footer from './components/GeneralComponents/Footer'
import { useLocation } from 'react-router-dom'

function App() {
  let location = useLocation()
  return (
    <div
      data-theme="corporate"
      className="mx-auto flex w-full flex-col sm:w-11/12 md:w-10/12 lg:w-8/12"
    >
      <AuthProvider>
        <NotificationContextProvider>
          <Navbar />
          <div className="min-h-[calc(100vh-70px)] max-sm:bg-base-300 max-sm:px-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/logowanie"
                element={
                  <AnonymousRoute>
                    <LoginPage />{' '}
                  </AnonymousRoute>
                }
              />
              <Route
                path="/rejestracja"
                element={
                  <AnonymousRoute>
                    <RegistrationPage />
                  </AnonymousRoute>
                }
              />
              <Route
                path="/zapomniane-haslo"
                element={
                  <AnonymousRoute>
                    <ForgotPasswordPage />{' '}
                  </AnonymousRoute>
                }
              />
              <Route
                path="/resetuj-haslo/:token"
                element={
                  <AnonymousRoute>
                    <ResetPasswordPage />
                  </AnonymousRoute>
                }
              />
              <Route element={<TeacherAllowed />}>
                <Route
                  path="/profil/zakupione-zajecia"
                  element={
                    <PrivateRoute>
                      <TeacherPurchaseHistoryPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profil"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profil/otrzymane-opinie"
                  element={
                    <PrivateRoute>
                      <ReceivedOpinions />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/plan/edytuj"
                  element={
                    <PrivateRoute>
                      <ModifyTimeslotsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/zajecia"
                  element={
                    <PrivateRoute>
                      <ListOfTeachersClassesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/zajecia/dodaj"
                  element={
                    <PrivateRoute>
                      <CreateClassesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/zajecia/edytuj"
                  element={
                    <PrivateRoute>
                      <EditClassesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profil/harmonogram"
                  element={
                    <PrivateRoute>
                      <TeacherSchedulePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/otrzymane-zapytania"
                  element={
                    <PrivateRoute>
                      <ReceivedQuestionsAboutClassesPage />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route element={<StudentAllowed />}>
                <Route
                  path="/profil-ucznia"
                  element={
                    <PrivateRoute>
                      <StudentProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profil/historia-zakupow"
                  element={
                    <PrivateRoute>
                      <PurchaseHistoryPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profil-ucznia/harmonogram"
                  element={
                    <PrivateRoute>
                      <StudentSchedulePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profil/dodane-opinie"
                  element={
                    <PrivateRoute>
                      <AddedOpinionsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/zajecia/:classesId/zapytaj"
                  element={
                    <PrivateRoute>
                      <AskAboutClassesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/zajecia/:classesId/zakup-po-zapytaniu"
                  element={<BuyClassesPageAfterAsk />}
                />
                <Route
                  path="/zajecia/:classesId/kup"
                  element={<BuyClassesPage />}
                />
                <Route
                  path="/wyslane-zapytania"
                  element={
                    <PrivateRoute>
                      <SendedQuestionsAboutClassesPage />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route
                path="/profil/edytuj"
                element={
                  <PrivateRoute>
                    <EditBaseProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profil/zmien-haslo"
                element={
                  <PrivateRoute>
                    <ChangePasswordPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profil/edytuj-dodatkowe"
                element={
                  <PrivateRoute>
                    <EditMoreInfosPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profil/edytuj-avatar"
                element={
                  <PrivateRoute>
                    <ChangeAvatarPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/skrzynka-odbiorcza"
                element={
                  <PrivateRoute>
                    <InboxPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/moje-pokoje"
                element={
                  <PrivateRoute>
                    <StartedRoomsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/pokoj/:roomId"
                element={
                  <PrivateRoute>
                    <RoomProvider>
                      <Room />
                    </RoomProvider>
                  </PrivateRoute>
                }
              />
              <Route path="/szukaj-zajec" element={<SearchClassesPage />} />
              <Route
                path="/szukaj-zajec/jezyk/:languageSlug"
                element={<SearchClassesPage />}
              />
              <Route
                path="/szukaj-zajec/miasto/:citySlug"
                element={<SearchClassesPage />}
              />
              <Route
                path="/szukaj-zajec/tekst/:searchText"
                element={<SearchClassesPage />}
              />
              <Route
                path="/szukaj-zajec/miejsce-zajec/:onlineSlug"
                element={<SearchClassesPage />}
              />
              <Route path="/zajecia/:classesId" element={<ClassesPage />} />

              <Route path="/nauczyciel/:teacherId" element={<TeacherPage />} />
              <Route path="/student/:studentId" element={<StudentPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          {!location.pathname.startsWith('/pokoj') && <Footer />}
        </NotificationContextProvider>
      </AuthProvider>
    </div>
  )
}

export default App
