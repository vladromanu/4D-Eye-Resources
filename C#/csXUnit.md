Table of contents
[TOC] 

### Basic Assertions
```
Assert.NotNull(okResult);

Assert.IsType<SearchBookings>(okResult.Value);

Assert.Equal((int)HttpStatusCode.OK, okResult.StatusCode);

Assert.True(parsedResult.Bookings.Count <= pageSize);
```

### Sending a request HttpClient
```
var relativeUri = new StringBuilder(_searchBookingRelativeUri);
relativeUri.Append($"?PageNumber={pageNumber}");
relativeUri.Append($"&PageSize={pageSize}");

// Act
var response = await TestClient.GetAsync(relativeUri.ToString());
var responseString = await response.Content.ReadAsStringAsync();

var parsedResult = JsonConvert.DeserializeObject<ResponseOutput.SearchBookings>(responseString);
```

### Non-Synchronous
```
[Trait("Category", "UnitTests")]
public class ActionHelperTests
{
    [Fact]
    [Trait("Services", "ActionHelper")]
    public void ActionHelper_GivenProviderNames_ReturnsValidProviders()
    {
        // Arrange && Act && Assert
        Assert.Equal(Providers.Dotw, ActionHelper.getProviderFromString("DOTW"));
    }
}
```

### Synchronous ( Filter By Example )
```
[Fact]
[Trait("Services", "PropertyRoomtypeService")]
public async Task GetAllAsync_SearchByPropertyId_ReturnsFilteredSet()
{
    // Arrange
    int _expectedPropertyId = 1;
    var _expectedSet = this._propertyRoomtypes.Where(x => x.PropertyId == _expectedPropertyId);

    _mockRepo.Setup(r => r.FindAsync(It.IsAny<PropertyRoomTypeRequest>())).ReturnsAsync(_expectedSet);
    var _sut = new PropertyRoomtypeService(_mockRepo.Object, _logger.Object);
    

    // Act
    var propertyRoomtypesDto = await _sut.GetAllAsync(new PropertyRoomTypeRequest()
    {
        PropertyId = _expectedPropertyId
    });

    // Assert
    Assert.Equal(_expectedSet.Count(), propertyRoomtypesDto.Count());

    foreach (var item in propertyRoomtypesDto)
    {
        Assert.IsType<PropertyRoomtypeDto>(item);
        Assert.Equal(_expectedPropertyId, item.PropertyId);
    }
}
```