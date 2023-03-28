import styles from "./index.module.css"

export const templ = `
	{{> NavBar}}
	{{> BackButton}}
	<div class="${styles.root}">
		<div class="${styles.main}">
			<div class="${styles.topSection}">
				{{{avatar}}}
				<h2>{{name}}</h2>
			</div>
			<div class="${styles.mainSection}">
				{{#each userData}}
				<div>
					<h4>{{ title }}</h4>
					<input placeholder="{{value}}" {{disabled}} name="{{name}}"/>
				</div>
				{{/ each}}
			</div>
			<div class="${styles.bottomSection}" data-button="{{button}}">
				{{#each pathData}}
					<div>
						{{{type}}}
					</div>
				{{/ each}}
			</div>
		</div>
	</div>
`