export class Item {
    name;
    description;
    image;
    done;

    constructor(name,description,image, done) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.done = done;
    }
}