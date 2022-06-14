import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

@Directive({
  selector: '[routerLink]',
  host: {'(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub{
  @Input('routerLink') linkParams : any;
  navigatedTo;

  onClick(){
    this.navigatedTo = this.linkParams;
  }
}

describe("Heroes component (deep tests)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroesService;
  let HEROES = [
    { id: 1, name: "SuperKid", strength: 8 },
    { id: 1, name: "WonderWoman", strength: 55 },
    { id: 1, name: "SuperMan", strength: 11 },
  ];

  mockHeroesService = jasmine.createSpyObj(["getHeroes", "addHero", "delete"]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      //schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: HeroService, useValue: mockHeroesService }],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should render correct hero component", () => {
    mockHeroesService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponentDEs.length).toEqual(3);
    for (let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it(`Should call the HeroService deleteHero 
    method when HeroComponent's delete button is clicked`, () => {
        mockHeroesService.getHeroes.and.returnValue(of(HEROES));
        spyOn(fixture.componentInstance,'delete');
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
        
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

    });

    it('should add a new hero when add hero button is clicked', () =>{
      mockHeroesService.getHeroes.and.returnValue(of(HEROES));
      fixture.detectChanges();
      let name = 'Mr Ice';
      mockHeroesService.addHero.and.returnValue(of({id:5, name, strength:12}));
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

      inputElement.value = name;
      addButton.triggerEventHandler('click',null);
      fixture.detectChanges();

      const text = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
      expect(text).toContain(name);

    })

    it('should call the correct route for the first hero', () =>{
      mockHeroesService.getHeroes.and.returnValue(of(HEROES));
      fixture.detectChanges();
      let heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
      let routerLink = heroComponentDEs[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);
      heroComponentDEs[0].query(By.css('a')).triggerEventHandler('click',null);

      expect(routerLink.navigatedTo).toBe('/detail/1');
    })
});
