// Listing Element
const form = document.getElementById('resumeForm') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resumeOutput') as HTMLDivElement

form.addEventListener('submit', (event:Event) => {
    event.preventDefault();

    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;

    // Type assertions 
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;

   
        const uniquePath = `resumes/${username.replace(/\s+/g, '_')}_cv.html`;

        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

        // Create resume output
        const resumeOutput = `
            <h2>Shareable Resume</h2>
            ${profilePictureURL ? `<img src='${profilePictureURL}' alt='Profile Picture' class='profilePicture'>` : '<p>No profile picture uploaded.</p>'}
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> <span contenteditable="true">  ${name} </span></p>
            <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
            <p><strong>Phone:</strong> <span contenteditable="true">${phone}</span></p>
            <p><strong>Address:</strong> <span contenteditable="true">${address}</span></p>
            <h3>Education</h3>
            <p contenteditable="true">${education}</p>
            <h3>Experience</h3>
            <p contenteditable="true">${experience}</p>
            <h3>Skills</h3>
            <p contenteditable="true">${skills}</p>
        `;

        const downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = 'Download Your Latest Resume';

        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.classList.remove("hidden");

            const buttonContainer = document.createElement('div');
            buttonContainer.id = "buttonContainer";
            resumeOutputElement.appendChild(buttonContainer);

            const downloadButton = document.createElement("button");
            downloadButton.textContent = "Download as PDF";
            downloadButton.addEventListener("click", () => {
                window.print();
            });
            buttonContainer.appendChild(downloadButton);

            const shareLinkButton = document.createElement("button");
            shareLinkButton.textContent = "Copy Shareable Link";
            shareLinkButton.addEventListener("click", async () => {
                try {
                    const shareableLink = `https://yourdomain.com/resumes/${username.replace(/\s+/g, "_")}_cv.html`;
                    await navigator.clipboard.writeText(shareableLink);
                    alert("Sharable link copied to clipboard!");
                } catch (err) {
                    console.log("Failed to copy link: ", err);
                    alert("Failed to copy link to clipboard, please try again.");
                }
            });

            buttonContainer.appendChild(shareLinkButton);
            resumeOutputElement.appendChild(downloadLink);

            resumeOutputElement.style.display = "block";
        } else {
            console.error('One or more output elements are missing');
        
    } 
});
