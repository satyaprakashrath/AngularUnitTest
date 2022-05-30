import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"

describe('Heroes component (shallow tests)', () =>{
    let fixture : ComponentFixture<HeroesComponent>;
    let mockHeroesService;
    let HEROES = [
        {id:1,name:'SuperKid', strength:8},
        {id:1,name:'WonderWoman', strength:55},
        {id:1,name:'SuperMan', strength:11}
    ];

    @Component({
        selector: 'app-hero',
        template: '<div></div>'
      })
    class FakeHeroComponent {
        @Input() hero: Hero;
        //@Output() delete = new EventEmitter();
      }
      
    mockHeroesService = jasmine.createSpyObj(['getHeroes','add', 'delete']);
    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            //schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: HeroService, useValue: mockHeroesService}
            ]
        })
        fixture = TestBed.createComponent(HeroesComponent);
    })

    it('should set correct heroes from service', ()=>{
        mockHeroesService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        expect(fixture.componentInstance.heroes.length).toBe(3);
    })

    it('should create one li element for each hero', ()=>{
        mockHeroesService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
    
})