import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component";

describe('Hero Component Shalow test', () =>{
    let fixture : ComponentFixture<HeroComponent>;
    beforeEach(() =>{
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]     
        })
        fixture = TestBed.createComponent(HeroComponent);
    })

    it('should have the correct hero', ()=>{
        fixture.componentInstance.hero = { id:1, name:'SuperDude', strength: 3}
        fixture.detectChanges();
        expect(fixture.componentInstance.hero.name).toBe('SuperDude');
    })

    it('should have the correct hero in the anchor tag', ()=>{
        fixture.componentInstance.hero = { id:1, name:'SuperDude', strength: 3}
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    })

    it('should have the correct hero in the anchor tag with debug element', ()=>{
        fixture.componentInstance.hero = { id:1, name:'SuperDude', strength: 3}
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('SuperDude');
    })
})