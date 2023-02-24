/**
 * POST /subscribe
 */
export async function onRequestPost(context) {
    try {
        let c = JSON.stringify(context);
        console.log(c);

        let emailForm = await context.request.formData();
        // come out as ["email","<email>"]
        let body = JSON.stringify(Array.from(emailForm.entries())[0]);

        let bodyArray = body.split(",");
        let emailAddress = bodyArray[1].replace("]", "").replace(/(^"|"$)/g, '');

        console.log(JSON.stringify(Array.from(emailForm.entries())));
        console.log("email: " + emailAddress);
        await context.env.SUBS.put(emailAddress, "true", {
            metadata: { lastUpdate: Date() },
        });
        return Response.redirect("https://justingarrison.com/?email=submit", 301);
    } catch (err) {
        return Response('Error parsing JSON content', { status: 400 });
    }
}