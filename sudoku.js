(function( $ ){

  var methods = {
     init : function( options ) {
        return this.each(function() {
            var settings = {
                levels: [
                    {level: "Easy", numbers: 70},
                    {level: "Medium", numbers: 30},
                    {level: "Hard", numbers: 20}
                ]
            };

            var defaults = {
                matrix: [],
                domMatrix: [],
                numOfRows: 9,
                numOfCols: 9,
                level: 40,
                selected: null,
                selectedSolution: null,
                answerTracker: {
                    "1": 9,
                    "2": 9,
                    "3": 9,
                    "4": 9,
                    "5": 9,
                    "6": 9,
                    "7": 9,
                    "8": 9,
                    "9": 9
                }
            };

            if ( options ) {
                $.extend(settings, options);
            }

            var $this = $(this);
            $this.addClass('sdk-game');

            //creates the sudoku number grid
            $this.createMatrix = function() {
                var matrix = new Array();
                for(var rowCounter=0;rowCounter<9;rowCounter++){
                    matrix[rowCounter] = new Array();
                    for(var colCounter=0;colCounter<9;colCounter++){
                        var number = colCounter/1 + 1 + (rowCounter*3) + Math.floor(rowCounter/3)%3;
                        if(number>9) number = number % 9;
                        if(number==0) number=9;
                        matrix[rowCounter][colCounter] = number;                
                    }            
                }
                // Switching rows
                for(var no=0;no<9;no+=3){
                    for(var no2=0;no2<3;no2++){
                        row1 = Math.floor(Math.random()*3);    
                        row2 = Math.floor(Math.random()*3);    
                        while(row2==row1){
                            row2 = Math.floor(Math.random()*3);    
                        }
                        row1 = row1 + no;
                        row2 = row2 + no;            
                        var tmpMatrix = new Array();
                        tmpMatrix = matrix[row1];
                        matrix[row1] = matrix[row2];
                        matrix[row2] = tmpMatrix;                 
                    }            
                }
                // Switching columns
                for(var no=0;no<9;no+=3){
                    for(var no2=0;no2<3;no2++){
                        col1 = Math.floor(Math.random()*3);    
                        col2 = Math.floor(Math.random()*3);    
                        while(col2==col1){
                            col2 = Math.floor(Math.random()*3);    
                        }
                        col1 = col1 + no;
                        col2 = col2 + no;            
                        var tmpMatrix = new Array();
                        for(var no3=0;no3<matrix.length;no3++){
                            tmpMatrixValue = matrix[no3][col1];
                            matrix[no3][col1] = matrix[no3][col2];                
                            matrix[no3][col2] = tmpMatrixValue;                
                        }
                    }    
                }
                return matrix;
            };
            
            // create the playable table
            $this.createTable = function() {
                //array to hold the dom reference to the table matrix so that we dont have to travers dom all the time
                defaults.domMatrix = [];
                //create table 
                defaults.table = $("<div class='sdk-table sdk-no-show'></div>");
                //add rows and columns to table
                for (var row=0;row<defaults.numOfRows;row++) {
                    defaults.domMatrix[row] = [];
                    var tempRow = $("<div class='sdk-row'></div>");
                    //set solid border after 3rd and 6th row
                    if (row == 2 || row == 5) tempRow.addClass("sdk-border"); 
                    for (var col=0;col<defaults.numOfCols;col++) {
                        defaults.domMatrix[row][col] = $("<div class='sdk-col' data-row='"+row+"' data-col='"+col+"'></div>");
                        //set solid border after 3rd and 6th 
