import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

describe("Heroes component (deep tests)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroesService;
  let HEROES = [
    { id: 1, name: "SuperKid", strength: 8 },
    { id: 1, name: "WonderWoman", strength: 55 },
    { id: 1, name: "SuperMan", strength: 11 },
  ];

  mockHeroesService = jasmine.createSpyObj(["getHeroes", "add", "delete"]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      schemas: [NO_ERRORS_SCHEMA],
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
});
