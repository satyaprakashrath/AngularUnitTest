import { ComponentFixture, fakeAsync, flush, TestBed, tick } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { Location } from "@angular/common";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe("HeroDetailComponent deep test", () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService, mockLocation, mockActivatedRoute;

  mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
  mockLocation = jasmine.createSpyObj(["back"]);
  mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => {
          return "3";
        },
      },
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation },
      ],
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: "SuperDude", strength: 12 })
    );
  });

  it("Should render hero name in h2 tag", () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("h2").textContent).toContain(
      "SUPERDUDE"
    );
  });

  it('should call heroservice updateHero method on save', fakeAsync( () =>{
      mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    flush();
    expect(mockHeroService.updateHero).toHaveBeenCalled();
      
  })
)
})
