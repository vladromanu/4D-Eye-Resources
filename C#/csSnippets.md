Table of contents
[TOC]

### Data Annotations

#### Range, RegularExpression
```
/// <summary>
/// Property Reference number
/// </summary>
[Range(0,int.MaxValue)]
[RegularExpression("([0-9]+)", ErrorMessage = "Please enter valid Number")]
public int PropertyId { get; set; }
```
#### Required, MinLength, StringLength
```
[StringLength(100)]
[Required]
[MinLength(3)]
public string BookingRefNo { get; set; }
```