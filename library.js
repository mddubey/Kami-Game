var deployMatrix = function(matrix){
	var str = '';
	for (var i = 0; i < matrix.length; i++) {
		str += '<tr>';
		for (var j = 0; j < matrix[i].length; j++) {
			var className = (Math.random() > 0.5)? 'x' : 'o';
			str += '<td class="'+matrix[i][j]+'">'+i+','+j+'</td>';
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


var printMatrix = function(matrix){
	var str = '';
	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {
			str += matrix[i][j]+'\t\t';
		};
		str += '\n\n';
	};
	str += '*********************************';
	console.log(str);
}


var changeCoordinates = function(matrix,size,start,end){
	if(start >= size || end >= size || start < 0 || end < 0)
		return;
	if(matrix[start][end] == 'x') return;
	matrix[start][end] = 'x';
	changeCoordinates(matrix,size,start+1,end);
	changeCoordinates(matrix,size,start-1,end);
	changeCoordinates(matrix,size,start,end+1);
	changeCoordinates(matrix,size,start,end-1);
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
	var coordinates = $(this).text().split(',');
	
	changeCoordinates(matrix,matrix.length,+(coordinates[0]),+(coordinates[1]))
	deployMatrix(matrix);
});

$(document).ready(function(){
	var initialMatrix = generateMatrix();
	deployMatrix(initialMatrix);
});