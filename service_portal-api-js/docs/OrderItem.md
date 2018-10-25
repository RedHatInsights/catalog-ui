# ServicePortalApi.OrderItem

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** |  | [optional] 
**count** | **Number** |  | 
**serviceParameters** | **Object** |  | 
**providerControlParameters** | **Object** | The provider specific parameters needed to provision this service. This might include namespaces, special keys | 
**servicePlanRef** | **String** | Stores the Plan ref from the Topology Service | 
**portfolioItemId** | **String** | Stores the Portfolio Item ID | 
**orderId** | **String** | ID of the order object | 
**state** | **String** | Current State of this order item | [optional] 
**createdAt** | **Date** |  | [optional] 
**orderedAt** | **Date** |  | [optional] 
**completedAt** | **Date** |  | [optional] 
**updatedAt** | **Date** |  | [optional] 
**externalRef** | **String** | An external reference from the provider that can be used to track the progress of the order item | [optional] 


<a name="StateEnum"></a>
## Enum: StateEnum


* `Created` (value: `"Created"`)

* `Ordered` (value: `"Ordered"`)

* `Failed` (value: `"Failed"`)

* `Completed` (value: `"Completed"`)




