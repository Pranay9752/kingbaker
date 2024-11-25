

const scrollToDiv = (id) => {
    console.log('id: ', id);
    const element = document.getElementById(id);
    if (element) {
        const yOffset = -100; // Adjust this value for any offset from the top
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
    }
};

export default scrollToDiv;