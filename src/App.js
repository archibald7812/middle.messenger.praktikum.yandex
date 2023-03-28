import { Login } from "./components/Login-Registration/Login"
import { Registration } from "./components/Login-Registration/Registration"
import { NavBar } from "./partials/NavBar/NavBar"
import { Profile } from "./components/Profile/Profile"
import { ChangePassword } from "./components/Profile/ChangePassword"
import { BackButton } from "./partials/BackButton/BackButton"
import { ChangeData } from "./components/Profile/ChangeData"
import { Chats } from "./components/Chats/Chats"
import { Error404 } from "./components/404-500/404"
import { Error500 } from "./components/404-500/500"

export const App = () => {

	NavBar()
	BackButton()

	switch (window.location.pathname) {
		case "/log-in":
			return Login()
		case "/registration":
			return Registration()
		case "/profile":
			return Profile()
		case "/new-password":
			return ChangePassword()
		case "/new-data":
			return ChangeData()
		case "/chats":
			return Chats()
		case "/404":
			return Error404()
		case "/500":
			return Error500()
		default:
			return Login()
	}
}