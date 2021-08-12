var contentType;
var fileContent;
//var conn = $.hdb.getConnection();
//var query;
//var rs;
var connection;
var procedureCall;


function insertRow(row) {	
	if (row === undefined) {
		return;
	}
	
	//var params = row.split(';').join(',').split(':').join(',').split(',');
	var params = row.split(';');
	var BUKRS = params[0];
	var ZZNMFAN = params[1];
	var SMENR = params[2];
	var SMIVE = params[3];
	var INFORME =  params[4];
	
	procedureCall(BUKRS, ZZNMFAN, SMENR, SMIVE, INFORME);
}

function loadDataFromFile(file_content) {
	try {
		var row_index = 1;
		var row_index2 = 1;
		var file_rows = file_content.split('\n');

		connection = $.hdb.getConnection();
		
		procedureCall = connection.loadProcedure(<insert name of procedure to load table);
		
		for (row_index2 = 0; row_index2 < 1; row_index2++) { 

		connection.executeUpdate('DELETE FROM TARGET_ECC.INFORME_EXSONAE');
		connection.commit();
		
		}


		for (row_index = 1; row_index < file_rows.length; row_index++) { // jump header
			insertRow(file_rows[row_index]);
		}
		
		connection.commit();
		connection.close();
		$.response.contentType = "text/plain";
		$.response.setBody("Arquivo Importado!!"); // assuming it's in the correct format! 
		$.response.returnCode = 200;
	} catch (err) {
	    $.response.contentType = "text/plain";
	    $.response.setBody("Erro ao executar a query: [" + err.message + "]");
	    $.response.returnCode = 200;
	}
}

// Check Content type headers and parameters
function validateInput() {
	
	if ($.request.method !== $.net.http.POST) {
		$.response.status = $.net.http.NOT_ACCEPTABLE;
		$.response.setBody("Apenas POST e suportado!");
		return false;
	}
	
	var file_entity_index;

	// Get entity header which contains the file content
	for (file_entity_index = 0; file_entity_index < $.request.entities.length; file_entity_index++) {

		if ($.request.entities[file_entity_index].headers.get("~content_name") === "fup_data") {
			contentType = $.request.entities[file_entity_index].headers.get("content-type");

			if (contentType === 'application/vnd.ms-excel') {
				$.response.status = $.net.http.ACCEPTED;
				fileContent = $.request.entities[4].body.asString();
				return true;
			}
		}
	}

	$.response.status = $.net.http.NOT_ACCEPTABLE;
	$.response.setBody("Arquivo nao e CSV!");
	return false;
}

// Request process 
function processRequest() {
	if (validateInput()) {
		loadDataFromFile(fileContent);
	}
}
// Call request processing  
processRequest();