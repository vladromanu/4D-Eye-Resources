Table of contents
[TOC]

### Data Annotations

* Range
```
public class PropertyRoomTypeRequest {
    /// <summary>
    /// Property Id
    /// </summary>
    [Range(0,int.MaxValue)]
    [RegularExpression("([0-9]+)", ErrorMessage = "Please enter valid Number")]
    public int PropertyId { get; set; }
```