var deployMatrix = function(matrix){
	var str = '';
	for (var i = 0; i < matrix.length; i++) {
		str += '<tr>';
		for (var j = 0; j < matrix[i].length; j++) {
			str += '<td class="'+matrix[i][j]+'" data-coordinate="'+i+','+j+'"></td>';
		};
		str+= '</tr>';
	};
	$('#matrix').html(str);
}

var generateMatrix = function(){
	var matrix = [];
	for (var i = 0; i < 5; i++) {
		matrix[i] = [];
		for (var j = 0; j < 5; j++) {
			matrix[i][j] = (Math.random() > 0.5)? 'x' : 'o';
		};
	};
	return matrix;
}

var changeCoordinates = function(matrix,initial,size,start,end){
	if(start >= size || end >= size || start < 0 || end < 0)
		return;
	if(matrix[start][end] !== initial) return;
	matrix[start][end] = (initial === 'o') ? 'x' : 'o';
	changeCoordinates(matrix,initial,size,start+1,end);
	changeCoordinates(matrix,initial,size,start-1,end);
	changeCoordinates(matrix,initial,size,start,end+1);
	changeCoordinates(matrix,initial,size,start,end-1);
}

var getCurrentMatrix = function(){
	var matrix = [];
	for (var i = 0; i < 5; i++) {
		matrix[i] = [];
		for (var j = 0; j < 5; j++) {
			matrix[i][j] = $('#matrix').find('tr').eq(i).children().eq(j).attr('class');
		};
	};
	return matrix;
}

$(document).on('click','td',function(){
	var matrix = getCurrentMatrix();
	var coordinates = $(this).data('coordinate').split(',');
	var className = $(this).attr('class');
	changeCoordinates(matrix,className,matrix.length,+(coordinates[0]),+(coordinates[1]))
	deployMatrix(matrix);
});

$(document).ready(function(){
	var initialMatrix = generateMatrix();
	deployMatrix(initialMatrix);
});