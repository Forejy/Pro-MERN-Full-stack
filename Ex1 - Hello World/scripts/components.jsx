// const element = React.createElement('div', {title: 'Outer div', className: "myh1"},
// 	React.createElement('h1', null, 'Hello World!')
// ) //Créer un élément React dans leVDOM

// ReactDOM.render(element, document.getElementById('contents')) //VDOM, dont on fait appel de la méthode render pour créer les éléments et les transférer vers le DOM

/* EN Javacript XML */

const element = (
	<div title="Outer div">
		<h1>Hello World</h1>
	</div>
)

ReactDOM.render(element, document.getElementById('contents'))