window.Resources = {
    items: [
        {
            id: "energy",
            name: "Energia",
            icon: "⚡",
            unit: "UE",
            max: 150,
            color: "#e4b44c",
            current: 100,
            production: 16,
            consumption: 10
        },
        {
            id: "water",
            name: "Água",
            icon: "💧",
            unit: "UA",
            max: 150,
            color: "#76b8ee",
            current: 100,
            production: 8,
            consumption: 12
        },
        {
            id: "oxygen",
            name: "Oxigênio",
            icon: "🫧",
            unit: "UA",
            max: 150,
            color: "#55b98b",
            current: 100,
            production: 6,
            consumption: 6
        },
        {
            id: "food",
            name: "Alimentos",
            icon: "🌱",
            unit: "UA",
            max: 150,
            color: "#9fca77",
            current: 100,
            production: 7,
            consumption: 11
        },
        {
            id: "materials",
            name: "Materiais",
            icon: "🧱",
            unit: "UM",
            max: 100,
            color: "#d7a782",
            current: 80,
            production: 2,
            consumption: 0
        }
    ],

    get(id) {
        return this.items.find(item => item.id === id);
    },

    update(id, amount) {
        const resource = this.get(id);

        if (!resource) return;

        resource.current = Math.max(
            0,
            Math.min(resource.max, resource.current + amount)
        );
    },

    reset() {
        const initial = {
            energy: 100,
            water: 100,
            oxygen: 100,
            food: 100,
            materials: 80
        };

        this.items.forEach(resource => {
            resource.current = initial[resource.id];
        });
    }
};
