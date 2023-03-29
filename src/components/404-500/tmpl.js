import styles from "./index.module.css"

export const templ = `
	{{> NavBar}}
	{{> BackButton}}
	<main class="${styles.root}">
		<div class="${styles.main}">
			{{error}}
		</div>
	</main>
`
