const baseUrl = "https://www.dnd5eapi.co/api/spells/";
const schoolUrl = "https://www.dnd5eapi.co/api/magic-schools/";

class DnD {
  async getSkills(errorCallback = () => {}) { // Создать список всех скиллов
    return fetch(baseUrl)
      .then((response) => {
        if (response.status >= 200 && response.status < 300)
          return response.json();
        errorCallback(true);
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  async getSpellInfo(spell_id, errorCallback = () => {}) {
    return Promise.all([
    this.getSpellOverview(spell_id, errorCallback),
    this.getSpellOverview(spell_id, errorCallback)
      .then(({school})=> this.getSpellSchool(school.index, errorCallback)),
    ]);
  }

  async getSpellOverview(spell_id, errorCallback = () => {}) { // Берёт общую инфу по скиллу
    return fetch(baseUrl + spell_id)
      .then((response) => {
        if (response.status >= 200 && response.status < 300)
          return response.json();
        errorCallback();
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  async getSpellSchool(school_id, errorCallback = () => {}) {
    return fetch(schoolUrl + school_id)
      .then((response) => {
        if (response.status >= 200 && response.status < 300)
          return response.json();
        errorCallback();
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }
}




export default DnD;
