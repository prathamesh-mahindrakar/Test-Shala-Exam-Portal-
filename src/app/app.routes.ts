import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { UserDashboard } from './pages/user/user-dashboard/user-dashboard';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { adminGuard } from './services/admin-guard';
import { normalGuard } from './services/normal-guard';
import { Profile } from './pages/profile/profile';
import { Welcome } from './pages/admin/welcome/welcome';
import { ViewCategories } from './pages/admin/view-categories/view-categories';
import { AddCategory } from './pages/admin/add-category/add-category';
import { ViewQuizzes } from './pages/admin/view-quizzes/view-quizzes';
import { AddQuiz } from './pages/admin/add-quiz/add-quiz';
import { UpdateQuiz } from './pages/admin/update-quiz/update-quiz';
import { ViewQuizQuestions } from './pages/admin/view-quiz-questions/view-quiz-questions';
import { AddQuestion } from './pages/admin/add-question/add-question';
import { LoadQuiz } from './pages/user/load-quiz/load-quiz';
import { Instruction } from './pages/user/instruction/instruction';
import { Start } from './pages/user/start/start';

export const routes: Routes = [
    { path: 'signup', component: Signup },
    { path: 'login', component: Login },
    { path: '', component: Home },
    { path: 'user-dashboard', component: UserDashboard, canActivate: [normalGuard], children: [{ path: ':catId', component: LoadQuiz }, { path: 'instructions/:qid', component: Instruction }] },
    { path: 'admin', component: AdminDashboard, children: [{ path: 'profile', component: Profile }, { path: '', component: Welcome }, { path: 'categories', component: ViewCategories }, { path: 'add-category', component: AddCategory }, { path: 'quizzes', component: ViewQuizzes }, { path: 'add-quiz', component: AddQuiz }, { path: 'quiz/:qid', component: UpdateQuiz }, { path: 'view-questions/:id/:title', component: ViewQuizQuestions }, { path: "add-question/:qid/:title", component: AddQuestion }], canActivate: [adminGuard] },
    { path: "start/:qid", component: Start, canActivate: [normalGuard] }
];
