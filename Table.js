com.Objects.Table = Class.extend({//This class holds a double array to encode the table
                                                 init:function(tableID,columns){
                                                    if($.isArray(columns) && typeof tableID === "string"){
                                                        this.tableID = tableID;
                                                        this.Table = [];
                                                        this.Table.push(columns);
                                                    }
                                                    else {
                                                        console.log("an array of columns must be passed in and you must hav a tableID (#Table_ID)");
                                                    }
                                                 },
                                                 addColumn:function(column){
                                                    if(typeof column === "string" && $.isArray(this.Table)){
                                                        //Add column to the header of the table
                                                        this.Table[0].push(column);
                                                        //push in a place holder for all avalable rows
                                                        for(var i = 1; i < this.Table.length; ++i){
                                                            this.Table[i].push("");
                                                        }
                                                    }
                                                    else {
                                                        console.log("column bust be a string and you must call init");
                                                    }
                                                 },
                                                 addRow:function(row){
                                                    if($.isArray(row) && $.isArray(this.Table) && row.length === this.Table[0].length){
                                                        //copy array by value
                                                        this.Table.push(row.slice(0));
                                                    }
                                                    else {
                                                        console.log("rows needs to ba an array, the table needs to be initalized, and the row length needs to be the same length as the columns");
                                                    }
                                                 },
                                                 removeColumn:function(column){
                                                    if(typeof column === "string" && $.isArray(this.Table)){
                                                        //Remove column from the header of the table
                                                        var columnFound = false;
                                                        var indexToRemove;
                                                 
                                                        for(var i = 0; i < this.Table[0].length; ++i){
                                                            if(column === this.Table[0][i]){
                                                                columnFound = true;
                                                                indexToRemove = i;
                                                                this.Table[0].splice(i,1);
                                                                break;
                                                            }
                                                        }
                                                        if(columnFound){
                                                            //push in a place holder for all avalable rows
                                                            for(var i = 1; i < this.Table.length; ++i){
                                                                this.Table[i].splice(indexToRemove,1);
                                                            }
                                                        }
                                                        else {
                                                            console.log("the column was not found");
                                                        }
                                                 
                                                    }
                                                    else {
                                                        console.log("column bust be a string and you must call init");
                                                    }
                                                 },
                                                 removeRow:function(indexToRemove){
                                                    var removed;
                                                    if(typeof indexToRemove === "number"){
                                                        removed = this.Table.splice(indexToRemove,1);
                                                        if(removed.length == 0){
                                                            console.log("no rows were removed");
                                                        }
                                                    }
                                                    else{
                                                        console.log("indexToRemove must be a number (initger)");
                                                    }
                                                 },
                                                 changeCellValue: function(row,column,value){
                                                    if(typeof row === "number" && typeof column === "number" && typeof value !== "undefined"){
                                                        if( this.Table.length > row && this.Table[row].length > column ){
                                                            this.Table[row][column] = value;
                                                        }
                                                        else {
                                                            console.log("cell does not exist");
                                                        }
                                                    }
                                                    else {
                                                        console.log("row and column must be numbers and the value must not be undefined");
                                                    }
                                                 },
                                                 returnTableHTML: function(showRowIDs) {
                                                    var tableHTML = "";
                                                    if(typeof showRowIDs !== "boolean"){
                                                        console.log("showRowIDs must be a boonean");
                                                        return "";
                                                    }
                                                 
                                                    if($.isArray(this.Table)){
                                                        for(var i = 0; i < this.Table.length; ++i){
                                                            (i == 0) ? tableHTML += "<thead><tr>" : tableHTML += "<tr>";
                                                            (showRowIDs && i == 0) ? tableHTML += "<td>Row ID</td>" : tableHTML += "";
                                                            (showRowIDs && i != 0) ? tableHTML += "<td>"+i+"</td>" : tableHTML += "";
                                                            for(var z = 0; z < this.Table[i].length; ++z){
                                                                tableHTML += "<td align='center' data-row='"+i+"' data-column='"+z+"'>"+this.Table[i][z]+"</td>";
                                                            }
                                                            (i == 0) ? tableHTML += "</tr></thead><tbody>" : tableHTML += "</tr>";
                                                        }
                                                        tableHTML += "</tbody>";
                                                    }
                                                    else{
                                                        console.log("You must call init");
                                                    }
                                                 
                                                    return tableHTML;
                                                 },
                                                 drawTable: function(showRowIDs){
                                                    if(typeof showRowIDs !== "boolean"){
                                                        console.log("showRowIDs must be a boonean");
                                                        return false;
                                                    }
                                                    $(this.tableID).append(this.returnTableHTML(showRowIDs));
                                                    return true;
                                                 },
                                                 redrawTable: function(showRowIDs){
                                                    $("td").unbind();
                                                    $(this.tableID).empty();
                                                    this.drawTable(showRowIDs);
                                                 }
                                                 
                                                 
                });
                
