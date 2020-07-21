Resource: https://docs.fluentvalidation.net/en/latest/start.html 

### Example: 
```
using FluentValidation;
using WebBeds.Roomtype.Content.Domain.Occupancies;

namespace WebBeds.Roomtype.Content.Application.Validators
{
    public class OccupancyValidator : AbstractValidator<Occupancy>
    {
        public OccupancyValidator()
        {
            RuleFor(x => x.TotalCapacity).NotEmpty()
                .GreaterThanOrEqualTo(1)
                .WithMessage("Total capacity cannot be null or lower than 1");

            RuleFor(x => x.AdultsMax).NotEmpty()
                .GreaterThanOrEqualTo(1)
                .LessThanOrEqualTo(oc => oc.TotalCapacity);

            RuleFor(x => x.AdultsMin).NotEmpty()
                .GreaterThanOrEqualTo(1)
                .LessThanOrEqualTo(oc => oc.TotalCapacity)
                .LessThanOrEqualTo(oc => oc.AdultsMax);

            RuleFor(x => x.AdultsWithChildrenMax)
                .NotEmpty()
                .GreaterThanOrEqualTo(1)
                .LessThanOrEqualTo(oc => oc.TotalCapacity)
                .GreaterThanOrEqualTo(oc => oc.AdultsMin);

            RuleFor(x => x.ChildrenMax).NotEmpty()
                 .LessThanOrEqualTo(oc => oc.TotalCapacity)
                 .LessThanOrEqualTo(oc => oc.AdultsWithChildrenMax)
                 .LessThanOrEqualTo(oc => oc.TotalCapacity - oc.AdultsMin);
        }

    }
}
```

Usage: 
```
public async Task<OccupancyDto> Create(Occupancy occupancy)
{
    OccupancyValidator validator = new OccupancyValidator();
    ValidationResult results = validator.Validate(occupancy);

    if(!results.IsValid)
    {
        StringBuilder sb = new StringBuilder(); 
        foreach (var failure in results.Errors)
        {
            sb.Append(failure.ErrorMessage);
        }

        throw new ArgumentException($"Invalid parameters given to the occupancy service. {sb.ToString()}");
    }

    _logger.LogInformation("Creating occupancy {occupancy}", occupancy);
    
    var occupancyId = await _occupancyRepository.Create(occupancy);

    return await GetAsync(occupancyId);
}
```



### Request DTO to validate through DataAnnotations
```
public class OccupancyCreateDto
{
    [Required]
    [Range(1, 20, ErrorMessage = "The total capacity must fit within 1-20 range")]
    public int TotalCapacity { get; set; }

    [Required]
    [Range(1, 19, ErrorMessage = "The adults min limit must fit within 1-19 range")]
    public int AdultsMin { get; set; }

    [Required]
    [Range(1, 20, ErrorMessage = "The adults max limit must fit within 1-20 range")]
    public int AdultsMax { get; set; }

    [Required]
    [Range(1, 19, ErrorMessage = "The children max limit must fit within 1-19 range")]
    public int ChildrenMax { get; set; }

    [Required]
    [Range(1, 20, ErrorMessage = "The number of adults with children limit must fit within 1-20 range")]
    public int AdultsWithChildrenMax { get; set; }

    public override string ToString()
    {
        return $"{TotalCapacity} - {AdultsMin} - {AdultsMax} - {ChildrenMax} - {AdultsWithChildrenMax}";
    }
}
```