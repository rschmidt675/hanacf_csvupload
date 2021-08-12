sap.ui.define(['jquery.sap.global','sap/m/MessageToast','sap/ui/core/mvc/Controller'],
	function(jQuery, MessageToast, Controller) {
	"use strict";

	var ControllerController = Controller.extend("ZHTS.ZHTS.controller.Upload", {
		
		handleUploadComplete: function(oEvent) {
			var sResponse = oEvent.getParameter("response");
			if (sResponse) {
				sResponse = sResponse.split(">")[1];
				sResponse = sResponse.substring(0, sResponse.length-5);
				MessageToast.show(sResponse);
				console.log(sResponse);
			}
		},

		handleUploadPress: function(oEvent) {
			var oFileUploader = this.byId("fileUploader");
			if (!oFileUploader.getValue()) {
				MessageToast.show("Escolha um arquivo primeiro");
				return;
			}

			oFileUploader.upload();
		},

		handleTypeMissmatch: function(oEvent) {
			var aFileTypes = oEvent.getSource().getFileType();
			jQuery.each(aFileTypes, function(key, value) {aFileTypes[key] = "*." +  value;});
			var sSupportedFileTypes = aFileTypes.join(", ");
			MessageToast.show("O tipo de arquivo *." + oEvent.getParameter("fileType") +
									" não é suportado. Escolha um arquivo do tipo: " +
									sSupportedFileTypes);
		},

		handleValueChange: function(oEvent) {
			MessageToast.show("Aperte 'Carregar'...'" +
									oEvent.getParameter("newValue") + "'");
		}
	});

	return ControllerController;

});
