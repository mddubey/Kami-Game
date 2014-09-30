function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

var deployInitialMatrix = function() {
	var str = '';
	for (var i = 0; i < 5; i++) {
		str += '<tr>';
		for (var j = 0; j < 5; j++) {
			var className = (Math.random() > 0.5) ? 'x' : 'o';
			str += '<td class="' + className + '" data-coordinate="' + i + ',' + j + '"></td>';
		}
		str += '</tr>';
	}
	$('#matrix').html(str);
};

var changeCoordinates = function(matrix, initial, size, start, end) {
	if (start >= size || end >= size || start < 0 || end < 0)
		return;
	if (matrix[start][end] !== initial) return;
	matrix[start][end] = (initial === 'o') ? 'x' : 'o';
	changeCoordinates(matrix, initial, size, start + 1, end);
	changeCoordinates(matrix, initial, size, start - 1, end);
	changeCoordinates(matrix, initial, size, start, end + 1);
	changeCoordinates(matrix, initial, size, start, end - 1);
};

var getPixel = function(row, column) {
	return $('#matrix').find('tr').eq(row).children().eq(column);
}

var getCurrentMatrix = function() {
	var matrix = [];
	for (var i = 0; i < 5; i++) {
		matrix[i] = [];
		for (var j = 0; j < 5; j++) {
			var pixel = getPixel(i, j);
			matrix[i][j] = pixel.attr('class');
		}
	}
	return matrix;
};

var changeMatrix = function(matrix) {
	matrix.forEach(function(row, i) {
		row.forEach(function(columnData, j) {
			var pixel = getPixel(i, j);
			if (pixel.attr('class') === columnData)
				return;
			pixel.attr('class', columnData);
		});
	});
};

$(document).on('click', 'td', function() {
	var matrix = getCurrentMatrix();
	var coordinates = $(this).data('coordinate').split(',');
	var className = $(this).attr('class');
	changeCoordinates(matrix, className, matrix.length, +(coordinates[0]), +(coordinates[1]));
	changeMatrix(matrix);
});

$(document).ready(deployInitialMatrix);