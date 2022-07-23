function activatePromocode(promocode)
{
	$.get('/promocode/'+promocode).done(function(backend)
	{
		console.log(backend);

		if (backend["status"] == "success")
		{
			$("#promocode-field").removeClass("border-danger");
		}
		else
		{
			$("#promocode-field").addClass("border-danger");
		}
	});
}