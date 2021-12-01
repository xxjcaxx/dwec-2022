import {
  Observable,
  of,
  reduce,
  from,
  switchMap,
  map,
  merge,
  mergeWith,
  fromEvent,
  startWith,
  combineLatestWith,
  BehaviorSubject,
} from "rxjs";

document.addEventListener("DOMContentLoaded", () => {
  // Generem un Observable de strings per anar demanant
  const sources = new BehaviorSubject("https://api.github.com/users");

  const fetch$ = sources.pipe(
    switchMap((url) => from(fetch(url).then((response) => response.json())))
  );

  const subscribeUsers = fetch$.subscribe((users) => {
    const divsUsers = users.map((user) => {
      const divUser = document.createElement("div");
      divUser.id = `divUser-${user.id}`;
      divUser.innerHTML = `
        <img src="${user.avatar_url}" style="width:200px"/>
        <h2 class="name">${user.login}</h2>
        <p class="url">${user.html_url}</p>`;
      return divUser;
    });
    const container = document.querySelector("#container");
    divsUsers.forEach((divUser) => {
      container.append(divUser);
    });
  });

  const refresh$ = fromEvent(document.querySelector("#refresh"), "click");

  refresh$.subscribe(() => {});
});
