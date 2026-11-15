window.Resources = {

  items: [
    energia = {
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
    agua = {
      id: "water",
      name: "Água",
      icon: "💧",
      unit: "UA",
      max: 150,
      color: "#76b8ee",
      current: 100,
      production: 5,
      consumption: 14
    },
    oxigenio = {
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
    alimento = {
      id: "food",
      name: "Alimentos",
      icon: "🌱",
      unit: "UA",
      max: 150,
      color: "#9fca77",
      current: 100,
      production: 2,
      consumption: 12
    },
    material = {
      id: "materials",
      name: "Materiais",
      icon: "🧱",
      unit: "UM",
      max: 100,
      current: 60,
      production: 0,
      consumption: 0,
      color: "#d7a782",
      current: 60
    }
  ],

  get(id) {
    return this.items.find(item => item.id == id)
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
    this.items.forEach( resource => {
      const initial = {
        energy: 100,
        water: 100,
        oxygen: 100,
        food: 100,
        materials: 60
      };

      resource.current = initial[resource.id]
    });

  }

};