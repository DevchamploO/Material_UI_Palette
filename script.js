const colors = [
			{top: '#d50000', bottom: '#f44336'},
			{top: '#e91e63', bottom: '#f06292'},
			{top: '#311b92', bottom: '#3f51b5'},
			{top: '#7b1fa2', bottom: '#aa00ff'},
			{top: '#2196f3', bottom: '#64b5f6'},
			{top: '#4caf50', bottom: '#81c784'},
			{top: '#ffc107', bottom: '#ffeb3b'},
			{top: '#f57c00', bottom: '#ff9800'}
		];

		let color_tiles = document.getElementsByClassName("color-tile");
		let tiles = document.getElementsByClassName("tile");
		

		for(i=0; i<colors.length; i++) {
			child_tiles = color_tiles[i].childNodes;
			child_tiles[1].style.background = colors[i].top;
			child_tiles[3].style.background = colors[i].bottom;
		}

		function rgb2hex(rgb) {
			'use strict';
			if (rgb.charAt(0) == 'r') {
				rgb = rgb.replace('rgb(','').replace(')','').split(',');
				let r = parseInt(rgb[0], 10).toString(16);
				let g = parseInt(rgb[1], 10).toString(16);
				let b = parseInt(rgb[2], 10).toString(16);
				r = r.length == 1 ? '0' + r : r;
				g = g.length == 1 ? '0' + g : g;
				b = b.length == 1 ? '0' + b : b;
				return '#' + r + g + b;
			}
		}

		function hex2rgb(hex) {
			'use strict';
			if (hex.charAt(0) === '#') {
				hex = hex.substr(1);
			}
			if((hex.length < 2) || (hex.length > 6)) {
				return false;
			}
			var values = hex.split(''),
			r,
			g,
			b;
			r = parseInt(values[0].toString() + values[1].toString(), 16);
			g = parseInt(values[2].toString() + values[3].toString(), 16);
			b = parseInt(values[4].toString() + values[5].toString(), 16);
			return [r,g,b];
		}

		function rgb2rgba(hex) {
			'use strict';
			let index = hex.length - 1;
			hex = hex.split('');
			hex[2] = 'ba';
			hex[hex.length-1] = ', 0.4)';
			return hex.join('');

		}
		let hex;

		function copyStringToClipboard(str) {
			let textArea = document.createElement('textarea');
			textArea.value = str;
			textArea.setAttribute('readonly', '');
			textArea.style = {position: 'absolute', left: '-9999px'};
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);
			console.log('copied ' + str);
		}

		let dropdown = document.getElementById('select');

		function sayHello() {
			rgb = this.style.background;
			if (dropdown.options[dropdown.selectedIndex].value == 'HEX') {
				console.log(copyStringToClipboard(rgb2hex(rgb)));
			}
			else if (dropdown.options[dropdown.selectedIndex].value == 'RGB') {
				console.log(copyStringToClipboard(rgb));
			}
			else if (dropdown.options[dropdown.selectedIndex].value == 'RGBA') {
				console.log(copyStringToClipboard(rgb2rgba(rgb)));
			}
			copyAnimation(this);
		}

		function copyAnimation(tile) {
			let txt = document.createElement('P');
			txt.innerText = "COPIED";
			tile.appendChild(txt);
			setTimeout(function() {
				tile.removeChild(tile.firstChild);
			}, 1000);
		}

		Array.from(tiles).forEach(function(element) {
			element.addEventListener('click', sayHello, false);
		});