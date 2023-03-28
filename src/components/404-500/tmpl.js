import styles from "./index.module.css"

export const templ = `
	{{> NavBar}}
	{{> BackButton}}
	<div class="${styles.root}">
		<div class="${styles.main}">
			{{error}}
		</div>
	</div>
`