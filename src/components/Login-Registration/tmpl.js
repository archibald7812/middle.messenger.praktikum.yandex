import styles from "./index.module.css"

export const templ = `
	{{> NavBar}}
	<main class="${styles.root}">
		<div class="${styles.main}">
			<div class="${styles.topSection}">
				<h2>{{ title }}</h2>
			</div>
			<div class="${styles.mainSection}">
				<form>
					{{#each inputs}}
					<div>
						<label>{{ title }}</label>
						<input type="{{type}}" name="{{name}}"/>
					</div>
					{{/ each}}
					<button type="submit">{{ buttonTitle }}</button>
				</form>
			</div>
			<div class="${styles.bottomSection}">
				<a href="/{{link}}">{{ linkTitle }}</a>
			</div>
		</div>
	</main>
`
