import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	// toolbar: theme.mixins.toolbar,
	title: {
		marginTop: "5%",
	},
	emptyButton: {
		minWidth: "150px",
	},
	checkoutButton: {
		minWidth: "150px",
	},
	link: {
		textDecoration: "none",
	},
	cardDetails: {
		// display: "flex",
		marginTop: "10%",
		// width: "100%",
		// justifyContent: "space-between",
	},
	spinner: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
}));
