# RSPlugin-styled-image
A simple React Studio plugin for a styled image tag

# Instructions
1. Download from [here]()
2. Access 'Components Plugin' folder from: React Studio Menu > Plugins > Show Plugin Manager > Show Plugins folder in Finder
3. Unzip and paste .plugin file in this folder
4. Click 'Reload Plugins' from Plugin Menu
5. You will see Styled Image component in the Components Menu

# How to use
## There are a few ways to use this plugin
### For the image URL, you can 
1. Put the image URL in a data slot and data slot in the Plugin Parameters under Source URL, or
2. You can select the data slot under the Data tab under Data Runtime Linkage, or
3. You can have the image URL as part of a data sheet and select the data sheet column under Data Runtime Linkage as well, [as seen here]()
	1. Please note that if you want to select a data sheet, you'll have to Carry the data sheet properties at the screen level as seen [here]()

### For the image style properties, similary, you can
1. Put the image style in the text block provided in the Plugin Parameters under the Style section
	1. Please notice the format of the styling. This format is derived from the CSS-in-JS style that React follows
	2. However, it's not a purely JSON object. It needs to be converted to JSON, and you need to pass a string to it
	3. Which means that while the JSON object looks like -
		```{display: "block"}```
	   You will need to pass -
	    ```{"display": "block"}```
	4. A very good tool to convert traditional CSS to CSS-in-JS is [CSS2JS found here](https://css2js.dotenv.dev/)
2. Alternatively, you can place the style in a data slot, or in a data sheet and pass it in the Data Runtime Linkage tab as well, as explained above.

# Logic behind building this Plugin
React Studio's own Image component is pretty powerful. However, it lacks pure CSS styling, which we need to do image centering and other styling. We decided to build this for that niche purpose, though we suspect that the React Studio team will one day allow pure CSS-in-JS styling on their default image component, thereby removing the need for this plugin. Since it mainly supports CSS and none of the other awesome features that the default Image component ships with, please use it only when you need to specifically target some CSS styling that's not available by default.

# Dependencies
Unlike our other plugins, there are no external dependencies in this one. All that we're exposing is React's own CSS-in-JS feature set to React Studio.

![Plugin running in React Studio]()

# Credits
Logo from [Icon Library](https://icon-library.com/icon/width-icon-3.html)

