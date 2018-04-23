export class TubitIDStorage{
  constructor(host){
    this.host = host;
  }

  async logsPut(logs){
    const body = await fetch(
      this.host + '/logs',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logs),
      },
    ).then((response) => response.json());

    if(!body.results || !body.time){
      throw new Error('Got an unexpected result from the server.');
    }

    return body;
  }
}

export default TubitIDStorage;
